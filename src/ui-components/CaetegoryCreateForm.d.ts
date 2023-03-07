/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CaetegoryCreateFormInputValues = {
    name?: string;
    imag?: string;
};
export declare type CaetegoryCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    imag?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CaetegoryCreateFormOverridesProps = {
    CaetegoryCreateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    imag?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CaetegoryCreateFormProps = React.PropsWithChildren<{
    overrides?: CaetegoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CaetegoryCreateFormInputValues) => CaetegoryCreateFormInputValues;
    onSuccess?: (fields: CaetegoryCreateFormInputValues) => void;
    onError?: (fields: CaetegoryCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: CaetegoryCreateFormInputValues) => CaetegoryCreateFormInputValues;
    onValidate?: CaetegoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function CaetegoryCreateForm(props: CaetegoryCreateFormProps): React.ReactElement;
