import { permanentRedirect } from "next/navigation";

export default function PaymentsSuccessPage() {
  permanentRedirect("/services");
}
