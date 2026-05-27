import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6 text-center select-none relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-electricBlue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.25em] text-rustBrown font-bold mb-4 font-poppins">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold text-white font-poppins leading-[1.1] mb-6">
          Page Not Found.
        </h1>
        <p className="text-cream/80 text-sm sm:text-base font-poppins font-light max-w-md leading-relaxed mb-8">
          The space you are looking for does not exist or has been relocated to another coordinate.
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-rustBrown text-white font-poppins font-semibold tracking-widest text-[11px] uppercase transition-all duration-300 hover:bg-electricBlue shadow-lg hover:shadow-electricBlue/20 focus:outline-none"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
