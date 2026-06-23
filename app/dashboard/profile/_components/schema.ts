import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s]{7,15}$/.test(val), {
      message: "Invalid phone number",
    }),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
