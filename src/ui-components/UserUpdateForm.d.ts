/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { User } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserUpdateFormInputValues = {
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
};
export declare type UserUpdateFormValidationValues = {
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
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
    UserUpdateFormGrid?: FormProps<GridProps>;
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
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserUpdateForm(props: UserUpdateFormProps): React.ReactElement;
