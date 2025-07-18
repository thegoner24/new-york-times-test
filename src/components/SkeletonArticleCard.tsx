export default function SkeletonArticleCard() {
  return (
    <div className="block bg-white p-4 rounded shadow mb-2 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/4" />
    </div>
  );
}
