/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { User } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
}) {
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      (currentFieldValue !== undefined ||
        currentFieldValue !== null ||
        currentFieldValue !== "") &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  return (
    <React.Fragment>
      {isEditing && children}
      {!isEditing ? (
        <>
          <Text>{label}</Text>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
}
export default function UserUpdateForm(props) {
  const {
    id,
    user,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    instagram: undefined,
    description: undefined,
    image: undefined,
    github: undefined,
    title: [],
    experience: undefined,
    projectNumber: undefined,
    sub: undefined,
    support: undefined,
    descriptionLong: undefined,
    CV: undefined,
    avatar: undefined,
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [instagram, setInstagram] = React.useState(initialValues.instagram);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [github, setGithub] = React.useState(initialValues.github);
  const [title, setTitle] = React.useState(initialValues.title);
  const [experience, setExperience] = React.useState(initialValues.experience);
  const [projectNumber, setProjectNumber] = React.useState(
    initialValues.projectNumber
  );
  const [sub, setSub] = React.useState(initialValues.sub);
  const [support, setSupport] = React.useState(initialValues.support);
  const [descriptionLong, setDescriptionLong] = React.useState(
    initialValues.descriptionLong
  );
  const [CV, setCV] = React.useState(initialValues.CV);
  const [avatar, setAvatar] = React.useState(initialValues.avatar);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...userRecord };
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setInstagram(cleanValues.instagram);
    setDescription(cleanValues.description);
    setImage(cleanValues.image);
    setGithub(cleanValues.github);
    setTitle(cleanValues.title ?? []);
    setCurrentTitleValue(undefined);
    setExperience(cleanValues.experience);
    setProjectNumber(cleanValues.projectNumber);
    setSub(cleanValues.sub);
    setSupport(cleanValues.support);
    setDescriptionLong(cleanValues.descriptionLong);
    setCV(cleanValues.CV);
    setAvatar(cleanValues.avatar);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(user);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(User, id) : user;
      setUserRecord(record);
    };
    queryData();
  }, [id, user]);
  React.useEffect(resetStateValues, [userRecord]);
  const [currentTitleValue, setCurrentTitleValue] = React.useState(undefined);
  const titleRef = React.createRef();
  const validations = {
    firstName: [],
    lastName: [],
    email: [{ type: "Email" }],
    phone: [{ type: "Phone" }],
    instagram: [],
    description: [],
    image: [],
    github: [],
    title: [],
    experience: [],
    projectNumber: [],
    sub: [],
    support: [],
    descriptionLong: [],
    CV: [],
    avatar: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName,
          lastName,
          email,
          phone,
          instagram,
          description,
          image,
          github,
          title,
          experience,
          projectNumber,
          sub,
          support,
          descriptionLong,
          CV,
          avatar,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            User.copyOf(userRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "UserUpdateForm")}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        defaultValue={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email: value,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        type="tel"
        defaultValue={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone: value,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Instagram"
        isRequired={false}
        isReadOnly={false}
        defaultValue={instagram}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram: value,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.instagram ?? value;
          }
          if (errors.instagram?.hasError) {
            runValidationTasks("instagram", value);
          }
          setInstagram(value);
        }}
        onBlur={() => runValidationTasks("instagram", instagram)}
        errorMessage={errors.instagram?.errorMessage}
        hasError={errors.instagram?.hasError}
        {...getOverrideProps(overrides, "instagram")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        defaultValue={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description: value,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        defaultValue={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image: value,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Github"
        isRequired={false}
        isReadOnly={false}
        defaultValue={github}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github: value,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.github ?? value;
          }
          if (errors.github?.hasError) {
            runValidationTasks("github", value);
          }
          setGithub(value);
        }}
        onBlur={() => runValidationTasks("github", github)}
        errorMessage={errors.github?.errorMessage}
        hasError={errors.github?.hasError}
        {...getOverrideProps(overrides, "github")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title: values,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            values = result?.title ?? values;
          }
          setTitle(values);
          setCurrentTitleValue(undefined);
        }}
        currentFieldValue={currentTitleValue}
        label={"Title"}
        items={title}
        hasError={errors.title?.hasError}
        setFieldValue={setCurrentTitleValue}
        inputFieldRef={titleRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Title"
          isRequired={false}
          isReadOnly={false}
          value={currentTitleValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.title?.hasError) {
              runValidationTasks("title", value);
            }
            setCurrentTitleValue(value);
          }}
          onBlur={() => runValidationTasks("title", currentTitleValue)}
          errorMessage={errors.title?.errorMessage}
          hasError={errors.title?.hasError}
          ref={titleRef}
          {...getOverrideProps(overrides, "title")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Experience"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={experience}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              experience: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience: value,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.experience ?? value;
          }
          if (errors.experience?.hasError) {
            runValidationTasks("experience", value);
          }
          setExperience(value);
        }}
        onBlur={() => runValidationTasks("experience", experience)}
        errorMessage={errors.experience?.errorMessage}
        hasError={errors.experience?.hasError}
        {...getOverrideProps(overrides, "experience")}
      ></TextField>
      <TextField
        label="Project number"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={projectNumber}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              projectNumber: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber: value,
              sub,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.projectNumber ?? value;
          }
          if (errors.projectNumber?.hasError) {
            runValidationTasks("projectNumber", value);
          }
          setProjectNumber(value);
        }}
        onBlur={() => runValidationTasks("projectNumber", projectNumber)}
        errorMessage={errors.projectNumber?.errorMessage}
        hasError={errors.projectNumber?.hasError}
        {...getOverrideProps(overrides, "projectNumber")}
      ></TextField>
      <TextField
        label="Sub"
        isRequired={false}
        isReadOnly={false}
        defaultValue={sub}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub: value,
              support,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.sub ?? value;
          }
          if (errors.sub?.hasError) {
            runValidationTasks("sub", value);
          }
          setSub(value);
        }}
        onBlur={() => runValidationTasks("sub", sub)}
        errorMessage={errors.sub?.errorMessage}
        hasError={errors.sub?.hasError}
        {...getOverrideProps(overrides, "sub")}
      ></TextField>
      <TextField
        label="Support"
        isRequired={false}
        isReadOnly={false}
        defaultValue={support}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support: value,
              descriptionLong,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.support ?? value;
          }
          if (errors.support?.hasError) {
            runValidationTasks("support", value);
          }
          setSupport(value);
        }}
        onBlur={() => runValidationTasks("support", support)}
        errorMessage={errors.support?.errorMessage}
        hasError={errors.support?.hasError}
        {...getOverrideProps(overrides, "support")}
      ></TextField>
      <TextField
        label="Description long"
        isRequired={false}
        isReadOnly={false}
        defaultValue={descriptionLong}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong: value,
              CV,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.descriptionLong ?? value;
          }
          if (errors.descriptionLong?.hasError) {
            runValidationTasks("descriptionLong", value);
          }
          setDescriptionLong(value);
        }}
        onBlur={() => runValidationTasks("descriptionLong", descriptionLong)}
        errorMessage={errors.descriptionLong?.errorMessage}
        hasError={errors.descriptionLong?.hasError}
        {...getOverrideProps(overrides, "descriptionLong")}
      ></TextField>
      <TextField
        label="Cv"
        isRequired={false}
        isReadOnly={false}
        defaultValue={CV}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV: value,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.CV ?? value;
          }
          if (errors.CV?.hasError) {
            runValidationTasks("CV", value);
          }
          setCV(value);
        }}
        onBlur={() => runValidationTasks("CV", CV)}
        errorMessage={errors.CV?.errorMessage}
        hasError={errors.CV?.hasError}
        {...getOverrideProps(overrides, "CV")}
      ></TextField>
      <TextField
        label="Avatar"
        isRequired={false}
        isReadOnly={false}
        defaultValue={avatar}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              instagram,
              description,
              image,
              github,
              title,
              experience,
              projectNumber,
              sub,
              support,
              descriptionLong,
              CV,
              avatar: value,
            };
            const result = onChange(modelFields);
            value = result?.avatar ?? value;
          }
          if (errors.avatar?.hasError) {
            runValidationTasks("avatar", value);
          }
          setAvatar(value);
        }}
        onBlur={() => runValidationTasks("avatar", avatar)}
        errorMessage={errors.avatar?.errorMessage}
        hasError={errors.avatar?.hasError}
        {...getOverrideProps(overrides, "avatar")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
