export default function SuscriptionStatus({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return (
        <p className="bg-green-500 text-white px-2 py-1 rounded-xl text-xs capitalize">
          {status}
        </p>
      );
    case 'canceled':
      return (
        <p className="bg-red-400 py-1 px-2 text-xs rounded-xl text-white capitalize">
          {status}
        </p>
      );
    default:
      return <p className="text-sm opacity-40 capitalize">{status}</p>;
  }
}
