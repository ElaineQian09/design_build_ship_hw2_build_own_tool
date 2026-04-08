import { redirect } from "next/navigation";

export default function AddQuestionRedirect() {
  redirect("/questions/new");
}
