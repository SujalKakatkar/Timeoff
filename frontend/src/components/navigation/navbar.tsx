'use client'

import { useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ThemeToggle } from '../theme-toggle'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/product', label: 'Product' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources' },
]

const menuVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

const listVariants: Variants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0 },
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full sticky top-0 z-50 flex justify-center px-fib-13 pt-fib-21">
      <motion.nav
        animate={{
          borderRadius: isOpen ? 28 : 100,
          boxShadow: isOpen
            ? '0 0 25px hsl(var(--primary) / 0.35), 0 0 60px hsl(var(--primary) / 0.15)'
            : '0 1px 2px hsl(var(--foreground) / 0.05)',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-4xl border border-border bg-card overflow-hidden"
      >
        {/* Top row — always visible */}
        <div className="flex items-center justify-between px-fib-21 py-fib-8">
          {/* Logo — left */}
          <a href="/" className="text-fib-21 font-bold text-foreground">
            TimeOff
          </a>

          {/* Links — center (desktop) */}
          <ul className="hidden md:flex items-center gap-fib-21">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-fib-13 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-fib-8">
            <ThemeToggle />

            <a
              href="/auth/signin"
              className="rounded-full bg-primary px-fib-13 py-fib-5 text-fib-13 text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Sign in
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-fib-5 rounded-full text-foreground hover:bg-accent transition-colors relative"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {isOpen ? <X className="size-fib-21" /> : <Menu className="size-fib-21" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div >

        {/* Mobile menu — grows down independently of shape morph */}
        <AnimatePresence initial={false} >
          {isOpen && (
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden"
            >
              <motion.ul
                variants={listVariants}
                initial="closed"
                animate="open"
                className="flex flex-col gap-fib-8 px-fib-21 pb-fib-21 pt-fib-5  border-border"
              >
                {links.map((link) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-fib-13 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}

                <motion.li variants={itemVariants} className="flex items-center justify-between pt-fib-5">
                  <ThemeToggle />
                  <a
                    href="/auth/signin"
                    className="rounded-full bg-primary px-fib-13 py-fib-5 text-fib-13 text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Sign in
                  </a>
                </motion.li>
              </motion.ul >
            </motion.div >
          )
          }
        </AnimatePresence >
      </motion.nav >
    </div >
  )
}

export default Navbar