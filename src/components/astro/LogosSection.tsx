
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export default function LogosSection() {
    return (
        <section className="bg-background pb-16 md:pb-32">
            <div className="group relative m-auto">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">
                            Aliados estrategicos internacionales
                        </p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                            <div className="flex">
                                <img
                                    className="mx-auto size-6 w-fit dark:invert"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Japan_International_Cooperation_Agency_logo.svg/1269px-Japan_International_Cooperation_Agency_logo.svg.png"
                                    alt="Nvidia Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/USAID-Identity.svg/2560px-USAID-Identity.svg.png"
                                    alt="Column Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://www.clipartmax.com/png/middle/145-1454872_idb-logo-colour-inter-american-development-bank.png"
                                    alt="GitHub Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AECID_logo.svg/1200px-AECID_logo.svg.png"
                                    alt="Nike Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://cdn.worldvectorlogo.com/logos/ue-union-europea.svg"
                                    alt="Lemon Squeezy Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://www.metropolis.org/sites/default/files/styles/max_325x325/public/2021-03/cideu-logo.png?itok=SFJnXTm4"
                                    alt="Laravel Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-7 w-fit dark:invert"
                                    src="https://banner2.cleanpng.com/20180721/yra/kisspng-united-nations-office-at-nairobi-habitat-iii-unite-women-political-leaders-global-forum-5b52b25e232048.4138122215321462701439.jpg"
                                    alt="Lilly Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-6 w-fit dark:invert"
                                    src="https://www.bcie.org/typo3conf/ext/bcie_package/Resources/Public/Images/logo-cabei-2021.png"
                                    alt="OpenAI Logo"
                                    height="24"
                                    width="auto"
                                />
                            </div>
                        </InfiniteSlider>

                        <div
                            className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
                        >
                        </div>
                        <div
                            className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
                        >
                        </div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>)
}
