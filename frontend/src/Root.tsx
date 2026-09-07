import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router'
import { routes } from './routes/routes'
import { Toaster } from './components/ui/toast'
import { TooltipProvider } from './components/ui/tooltip'

function Root() {



    return (
        <ThemeProvider >
            <TooltipProvider>
                {/* dark mode fliker needs to fix */}
                <RouterProvider router={routes} />
                <Toaster />
            </TooltipProvider>
        </ThemeProvider >
    )
}

export default Root