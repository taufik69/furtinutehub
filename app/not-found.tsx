export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="px-6 py-2 bg-black text-white rounded-lg">
        Go Home
      </a>
    </div>
  );
}
