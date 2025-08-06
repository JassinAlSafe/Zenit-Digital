export default function AbstractShapes({ shapeType }) {
  switch (shapeType) {
    case "circles":
      return (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          {/* Gray/black overlapping circles for Data Engineering & AI - change to blue on hover */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 group-hover:from-blue-400 group-hover:via-blue-500 group-hover:to-blue-600 rounded-full opacity-90 transition-all duration-500 ease-out"></div>
            <div className="absolute w-20 h-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 rounded-full opacity-95 translate-x-6 translate-y-3 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      );
    case "waves":
      return (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          {/* Red/orange curved shapes for Product Design - enhance colors on hover */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-16 h-32 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 group-hover:from-red-400 group-hover:via-red-500 group-hover:to-orange-500 rounded-full opacity-85 rotate-12 transform scale-y-125 transition-all duration-500 ease-out"></div>
            <div className="absolute w-14 h-28 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 group-hover:from-red-500 group-hover:via-orange-500 group-hover:to-orange-600 rounded-full opacity-90 rotate-12 transform scale-y-125 translate-x-6 translate-y-2 transition-all duration-500 ease-out"></div>
            <div className="absolute w-12 h-24 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 group-hover:from-orange-500 group-hover:via-orange-600 group-hover:to-red-600 rounded-full opacity-95 rotate-12 transform scale-y-125 translate-x-10 translate-y-4 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      );
    case "dots":
      return (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          {/* Gray/black circles for Full-Stack Development - change to green on hover */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-28 h-28 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 group-hover:from-green-400 group-hover:via-green-500 group-hover:to-green-600 rounded-full opacity-80 transition-all duration-500 ease-out"></div>
            <div className="absolute w-8 h-8 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 group-hover:from-green-500 group-hover:via-green-600 group-hover:to-green-700 rounded-full opacity-95 -translate-x-10 -translate-y-8 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          {/* Default abstract shape */}
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 group-hover:from-blue-400 group-hover:to-blue-600 rounded-full opacity-70 transition-all duration-500 ease-out"></div>
        </div>
      );
  }
}
