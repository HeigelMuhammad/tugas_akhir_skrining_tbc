export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Tidak ada Navbar di sini */}
      {children}
    </div>
  );
}
