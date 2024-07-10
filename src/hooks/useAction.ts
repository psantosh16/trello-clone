import { useCallback, useState } from "react";
import { z, ZodSchema } from "zod";
import {
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Means TInput is the input type and TOutput is the output type
// ActionState is the return type of the {fieldErrors, error and data}
export type ActionState<TInput, TOutput> = {
  fieldErrors?: string[];
  error?: string;
  data?: TOutput;
  // Data is the output type
};

type UseActionProps<TInput , TOuput> = {
  schema: ZodSchema<TInput>;
  method: (data: TInput) => Promise<ActionState<TInput , TOuput>>;
  options?: ActionOptions;
};

interface ActionOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onCompleted?: () => void;
}

export function useAction<
TInput , TOuput 
>(
  action: UseActionProps<TInput , TOuput>,
  options: ActionOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState<
    string[] | undefined
  >(undefined);
  const [data, setData] = useState<TOuput | undefined>(undefined);
  const form: UseFormReturn = useForm({
    resolver: zodResolver(action.schema),
  });


  const execute = useCallback(
    async (values: z.infer<typeof action.schema>) => {
      setIsLoading(true);
      try {
        const data = action.schema.safeParse(values);
        if (!data.success) {
          console.log("useAction Data error ", data.error.message);
          options?.onError?.(data.error);
          setError(data.error.message);
        }
        const result = await action.method(data?.data!);
        if (result.error) {
          console.log("useAction error ", result.error);
          options.onError?.(result.error);
          setError(result.error);
        }
        if (result.fieldErrors) {
          console.log("useAction fieldError ", result.error);
          options.onError?.(result.error);
          setFieldErrors(result.fieldErrors);
        }
        if (result.data) {
          console.log("useAction data ", result.data);
          options.onSuccess?.(result.data);
          setData(result.data);
        }

        form.reset();
      } finally {
        setIsLoading(false);
        options?.onCompleted?.();
      }
    },
    [action, form, options , data , error , fieldErrors]
  );

  return { form, isLoading, execute, options, error, data, fieldErrors };
}
