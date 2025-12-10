import ProfileHeader from "@/components/profile-header";
import ProfileContent from "@/components/profile-content";

const user = {
  nama: "Zakaria Zidan",
  email: "zakariazidan12@gmail.com",
  role: "user",
}

export default function Page() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <ProfileHeader nama={user.nama} email={user.email} role={user.role}/>
      <ProfileContent />
    </div>
  );
}
