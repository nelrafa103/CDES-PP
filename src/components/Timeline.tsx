import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {
    date: string;
    title: string;
    content: string;
};

 
const Timeline = ({timelineData}: {timelineData: any}) => {
    return (
        <section className="bg-muted py-32">
            <div className="container">
                <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter ">
                    Nuestra Historia
                </h1>
                <div className="relative mx-auto max-w-4xl">
                    <Separator
                        orientation="vertical"
                        className="bg-white absolute left-2 top-4"
                    />
                    {timelineData.map((entry: any, index: number) => (
                        <div key={index} className="relative mb-10 pl-8">
                            <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
                            <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                                {entry.Titulo}
                            </h4>

                            <h5 className="text-md -left-34 text-muted-foreground top-3 rounded-xl tracking-tight xl:absolute">
                                {entry.Fecha}
                            </h5>

                            <Card className="my-5 border-none shadow-none">
                                <CardContent className="px-0 xl:px-2">
                                    <div
                                        className="prose dark:prose-invert text-foreground mx-2"
                                        dangerouslySetInnerHTML={{ __html: entry.Descripcion }}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Timeline };
