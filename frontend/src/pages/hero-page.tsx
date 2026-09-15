

 function HeroPage() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center px-fib-13 pt-fib-55 pb-fib-89 text-center">

      

     <div className="text-center flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-fib-34 md:text-fib-55 xl:text-fib-89 font-bold text-foreground leading-tight max-w-xl">
          Time off, made effortless
        </h1>

        {/* Subtitle */}
        <p className="mt-fib-13 text-fib-13 text-muted-foreground max-w-md">
          One place for your team to request leave, get approvals, and stay staffed with zero guesswork
        </p>

        {/* CTA */}
        <a
          href="/demo"
          className="mt-fib-21 rounded-full bg-primary px-fib-21 py-fib-8 text-fib-13 text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Request a Demo
        </a>
     </div>

    </section >
  );
}

export default HeroPage