"use client";

import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
    title: string;
    description: string;
}

interface BookingStepperProps {
    steps: Step[];
    currentStep: number;
}

export function BookingStepper({ steps, currentStep }: BookingStepperProps) {
    return (
        <div className="w-full">
            <nav aria-label="Progress">
                <ol
                    role="list"
                    className="space-y-4 md:flex md:space-x-8 md:space-y-0"
                >
                    {steps.map((step, index) => (
                        <li key={step.title} className="md:flex-1">
                            <div
                                className={cn(
                                    "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                                    index < currentStep
                                        ? "border-primary"
                                        : index === currentStep
                                        ? "border-primary"
                                        : "border-gray-200"
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium",
                                        index < currentStep
                                            ? "bg-primary text-white"
                                            : index === currentStep
                                            ? "border-2 border-primary bg-white text-primary"
                                            : "border-2 border-gray-300 bg-white text-gray-500"
                                    )}
                                >
                                    {index < currentStep ? (
                                        <CheckIcon className="h-5 w-5" />
                                    ) : (
                                        index + 1
                                    )}
                                </span>
                                <span className="mt-3 flex flex-col">
                                    <span
                                        className={cn(
                                            "text-sm font-medium",
                                            index <= currentStep
                                                ? "text-primary"
                                                : "text-gray-500"
                                        )}
                                    >
                                        {step.title}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {step.description}
                                    </span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}
