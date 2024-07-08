import { useCallback, useState } from "react";
import { z, ZodSchema } from "zod";
import {
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type ActionState = {
  error?: string;
  success: boolean;
  data?: {
    [key: string]: any;
  };
};

type UseActionProps<TInput, TOutput> = {
  schema: ZodSchema<TInput>;
  defaultValues: DefaultValues<TOutput>;
  method: (data: TInput) => Promise<ActionState>;
  options?: ActionOptions<TInput>;
};

interface ActionOptions<T> {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onCompleted?: () => void;
}

export function useAction<TInput, TOutput extends FieldValues>(
  action: UseActionProps<TInput, TOutput>,
  options: ActionOptions<TInput> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<ActionState | undefined>(undefined);

  const form: UseFormReturn<TOutput> = useForm<TOutput>({
    resolver: zodResolver(action.schema),
    defaultValues: action.defaultValues,
  });

  const execute = useCallback(
    async (values: z.infer<typeof action.schema>) => {
      setIsLoading(true);
      try {
        const data = action.schema.safeParse(values);
        if (!data.success) {
          console.log("useAction Data error ", data.error);
          options?.onError?.(data.error);
          setError(data.error.message);
          return;
        }
        const result = await action.method(data.data);
        if (!result.success) {
          console.log("useAction error ", result.error);
          options.onError?.(result.error);
          setError(result.error);
          return;
        }
        console.log("useAction success ", result.data);
        options.onSuccess?.(result.data);
        setData(result);
        form.reset();
      } finally {
        setIsLoading(false);
        options?.onCompleted?.();
      }
    },
    [isLoading, action]
  );

  return { form, isLoading, execute, options, error, data };
}
