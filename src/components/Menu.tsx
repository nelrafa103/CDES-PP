"use client"
import { Menu as MenuIcon, X } from 'lucide-react'
import { useState, useEffect } from 'react' // Remove 'use' from here

const menuItems = [
    { name: 'Acerca de nosotros', href: '/nosotros' },
    { name: 'PES', href: '/plan-estrategico-de-santiago' },
    { name: 'Noticias', href: '/noticias' },
    { name: 'Biblioteca', href: '/biblioteca' },
    { name: 'Contacto', href: '/contacto' },
]

export function Menu() {
    const [menuState, setMenuState] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [logo, setLogo] = useState<any>()

    useEffect(() => {
        const getMenu = async () => {
            const request = await fetch(`${import.meta.env.PUBLIC_STRAPI_URL}/api/navegacion?populate=*`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${import.meta.env.PUBLIC_STRAPI_KEY}`
                }
            })
            const response = await request.json()
            return response
        }

        getMenu().then((response) => {
            setMenuItems(response.data.Enlaces)
            setLogo(response.data.Logo)
        }).catch((error) => {
            console.error('Error fetching menu:', error)
        })
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="absolute inset-x-0 top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all duration-200 lg:z-50"
            >
                <div className="mx-auto max-w-screen-2xl px-6 lg:px-20">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-6">
                            <a href="/" className="flex items-center gap-2" aria-label="Logo">
                                {logo && (
                                    <img
                                        src={`${import.meta.env.PUBLIC_STRAPI_URL}${logo.url}`}
                                        alt="CDES Logo"
                                        className="h-8 w-auto"
                                    />
                                )}
                            </a>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="hidden items-center gap-8 lg:flex">
                                {menuItems.map((item: any, index: number) => (
                                    <a
                                        key={index}
                                        href={item.Url}
                                        className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                                    >
                                        {item.Titulo}
                                    </a>
                                ))}
                            </div>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <MenuIcon className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuState && (
                    <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 lg:hidden">
                        <div className="p-6 space-y-4">
                            {menuItems.map((item: any, index: number) => (
                                <a
                                    key={index}
                                    href={item.Url}
                                    className="block text-sm font-medium text-gray-700 hover:text-primary"
                                    onClick={() => setMenuState(false)}
                                >
                                    {item.Titulo}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}