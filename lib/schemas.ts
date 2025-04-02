import { z } from "zod";

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Booking schemas
export const bookingDetailsSchema = z
  .object({
    pickupLocation: z.string().min(1, "Please select a pickup location"),
    dropoffLocation: z.string().min(1, "Please select a drop-off location"),
    pickupDate: z.string().min(1, "Please select a pickup date"),
    dropoffDate: z.string().min(1, "Please select a drop-off date"),
    motorcycle: z.string().min(1, "Please select a motorcycle"),
  })
  .refine(
    (data) => {
      const pickup = new Date(data.pickupDate);
      const dropoff = new Date(data.dropoffDate);
      return dropoff > pickup;
    },
    {
      message: "Drop-off date must be after pickup date",
      path: ["dropoffDate"],
    },
  );

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BookingDetailsFormData = z.infer<typeof bookingDetailsSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
