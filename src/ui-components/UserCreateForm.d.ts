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
export declare type UserCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    instagram?: string;
    description?: string;
    image?: string;
    github?: string;
    title?: string[];
    experience?: number;
    projectNumber?: number;
    sub?: string;
    support?: string;
    descriptionLong?: string;
    CV?: string;
    avatar?: string;
    facebook?: string;
    twitter?: string;
    telegram?: string;
    linkedIn?: string;
    buyMeACoffee?: string;
};
export declare type UserCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    instagram?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    github?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    experience?: ValidationFunction<number>;
    projectNumber?: ValidationFunction<number>;
    sub?: ValidationFunction<string>;
    support?: ValidationFunction<string>;
    descriptionLong?: ValidationFunction<string>;
    CV?: ValidationFunction<string>;
    avatar?: ValidationFunction<string>;
    facebook?: ValidationFunction<string>;
    twitter?: ValidationFunction<string>;
    telegram?: ValidationFunction<string>;
    linkedIn?: ValidationFunction<string>;
    buyMeACoffee?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCreateFormOverridesProps = {
    UserCreateFormGrid?: FormProps<GridProps>;
    firstName?: FormProps<TextFieldProps>;
    lastName?: FormProps<TextFieldProps>;
    email?: FormProps<TextFieldProps>;
    phone?: FormProps<TextFieldProps>;
    instagram?: FormProps<TextFieldProps>;
    description?: FormProps<TextFieldProps>;
    image?: FormProps<TextFieldProps>;
    github?: FormProps<TextFieldProps>;
    title?: FormProps<TextFieldProps>;
    experience?: FormProps<TextFieldProps>;
    projectNumber?: FormProps<TextFieldProps>;
    sub?: FormProps<TextFieldProps>;
    support?: FormProps<TextFieldProps>;
    descriptionLong?: FormProps<TextFieldProps>;
    CV?: FormProps<TextFieldProps>;
    avatar?: FormProps<TextFieldProps>;
    facebook?: FormProps<TextFieldProps>;
    twitter?: FormProps<TextFieldProps>;
    telegram?: FormProps<TextFieldProps>;
    linkedIn?: FormProps<TextFieldProps>;
    buyMeACoffee?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onSuccess?: (fields: UserCreateFormInputValues) => void;
    onError?: (fields: UserCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onValidate?: UserCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserCreateForm(props: UserCreateFormProps): React.ReactElement;
