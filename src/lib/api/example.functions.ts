import { z } from "zod";

export function getGreeting({ name }: { name: string }) {
  const validated = z.string().min(1).parse(name);
  return {
    greeting: `Hello, ${validated}!`,
  };
}
