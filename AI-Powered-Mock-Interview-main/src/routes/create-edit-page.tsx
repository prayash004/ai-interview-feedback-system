import { FormMockInterview } from "@/components/form-mock-interview";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const CreateEditPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          } else {
            toast.error("Interview not found", {
              description: "This interview may have been removed.",
            });
          }
        } catch (error) {
          console.log(error);

          if (!navigator.onLine) {
            toast.error("You are offline", {
              description: "Reconnect to the internet and try again.",
            });
            return;
          }

          if (error instanceof FirebaseError) {
            toast.error("Unable to load interview", {
              description: error.message,
            });
            return;
          }

          toast.error("Unable to load interview", {
            description: "Something went wrong. Please try again.",
          });
        }
      }
    };

    fetchInterview();
  }, [interviewId]);

  return (
    <div className="my-4 flex-col w-full">
      <FormMockInterview initialData={interview} />
    </div>
  );
};
