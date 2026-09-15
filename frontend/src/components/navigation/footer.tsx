import { UserRound } from "lucide-react";


export function Footer() {
    return (
        // todo: you should change the color of the footer according to the theme of the website here we use the random and inline color instead of color mentioned inside index.css file
        <footer className="relative overflow-hidden bg-zinc-950 text-zinc-100 pt-fib-55 pb-fib-21">
            <div className="mx-auto max-w-6xl px-fib-21">

                {/* Top row: social + link columns */}
                <div className="flex flex-col md:flex-row justify-between gap-fib-34">

                    {/* Left: social + address */}
                    <div className="flex flex-col gap-fib-21 max-w-xs">
                        <div className="flex items-center gap-fib-8">
                            <a href="#" aria-label="Instagram" className="p-fib-5 rounded-full border border-zinc-700 hover:border-zinc-400 transition-colors">
                                <UserRound className="size-fib-13" />
                            </a>
                            <a href="#" aria-label="Twitter" className="p-fib-5 rounded-full border border-zinc-700 hover:border-zinc-400 transition-colors">
                                <UserRound className="size-fib-13" />
                            </a>
                            <a href="#" aria-label="YouTube" className="p-fib-5 rounded-full border border-zinc-700 hover:border-zinc-400 transition-colors">
                                <UserRound className="size-fib-13" />
                            </a>
                        </div>

                        <p className="text-fib-13 text-zinc-400 leading-snug">
                            42 Baker Street, London
                            <br />
                            United Kingdom
                        </p>

                        <a href="mailto:hello@timeoff.com" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">
                            hello@timeoff.com
                        </a>
                        <a href="tel:+441234567890" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">
                            +44 1234 567 890
                        </a>
                    </div>

                    {/* Link columns */}
                    <div className="flex flex-wrap gap-fib-55">
                        <div className="flex flex-col gap-fib-8">
                            <span className="text-fib-13 font-semibold text-white">Menu</span>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">About</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Features</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Pricing</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Careers</a>
                        </div>

                        <div className="flex flex-col gap-fib-8">
                            <span className="text-fib-13 font-semibold text-white">Product</span>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Requests</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Approvals</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Calendar</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Reports</a>
                        </div>

                        <div className="flex flex-col gap-fib-8">
                            <span className="text-fib-13 font-semibold text-white">Support</span>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Blog</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Contact</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Terms</a>
                            <a href="#" className="text-fib-13 text-zinc-400 hover:text-white transition-colors">Tutorials</a>
                        </div>
                    </div>
                </div>

                {/* Divider + Get Started */}
                <div className="flex items-center justify-end mt-fib-55 pb-fib-21 border-b border-zinc-800">
<a
                    href="/demo"
                    className="mb-fib-13 rounded-full bg-white text-zinc-950 px-fib-13 py-fib-5 text-fib-13 font-medium hover:bg-zinc-200 transition-colors"
          >
                    Get Started
                </a>
            </div>

            {/* Bottom row: legal links */}
            <div className="flex justify-end gap-fib-34 mt-fib-13">
                <a href="#" className="text-fib-13 text-zinc-500 hover:text-white transition-colors tracking-wide">
                    TERMS &amp; CONDITIONS
                </a>
                <a href="#" className="text-fib-13 text-zinc-500 hover:text-white transition-colors tracking-wide">
                    PRIVACY POLICY
                </a>
            </div>
        </div>


    </footer >
  );
}