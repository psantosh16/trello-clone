import { useCallback, useState } from "react";
import { z, ZodSchema } from "zod";
import {
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type ActionState<
  TInput extends FieldValues,
  TOutput extends FieldValues,
> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string;
  data?: TOutput;
};

type UseActionProps<TInput extends FieldValues, TOutput extends FieldValues> = {
  schema: ZodSchema<TInput>;
  defaultValues: DefaultValues<TOutput>;
  method: (data: TInput) => Promise<ActionState<TInput, TOutput>>;
  options?: ActionOptions<TInput>;
};

interface ActionOptions<T> {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onCompleted?: () => void;
}

export function useAction<
  TInput extends FieldValues,
  TOutput extends FieldValues,
>(
  action: UseActionProps<TInput, TOutput>,
  options: ActionOptions<TInput> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);

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
          setFieldErrors(result.fieldErrors!);
        }
        if (result.data) {
          console.log("useAction data ", result.error);
          options.onSuccess?.(result.data);
          setData(result.data);
        }

        form.reset();
      } finally {
        setIsLoading(false);
        options?.onCompleted?.();
      }
    },
    [isLoading, action]
  );

  return { form, isLoading, execute, options, error, data, fieldErrors };
}
