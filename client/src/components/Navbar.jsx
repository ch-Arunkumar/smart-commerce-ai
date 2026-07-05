export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <img
        className="w-10 h-10 rounded-full"
        src="https://i.pravatar.cc/100"
        alt="profile"
      />
    </div>
  );
}