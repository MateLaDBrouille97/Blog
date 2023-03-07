/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Caetegory } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CaetegoryUpdateFormInputValues = {
    name?: string;
    imag?: string;
};
export declare type CaetegoryUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    imag?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CaetegoryUpdateFormOverridesProps = {
    CaetegoryUpdateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    imag?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CaetegoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: CaetegoryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    caetegory?: Caetegory;
    onSubmit?: (fields: CaetegoryUpdateFormInputValues) => CaetegoryUpdateFormInputValues;
    onSuccess?: (fields: CaetegoryUpdateFormInputValues) => void;
    onError?: (fields: CaetegoryUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: CaetegoryUpdateFormInputValues) => CaetegoryUpdateFormInputValues;
    onValidate?: CaetegoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CaetegoryUpdateForm(props: CaetegoryUpdateFormProps): React.ReactElement;
