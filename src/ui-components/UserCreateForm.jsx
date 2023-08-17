/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
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
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
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
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
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
  const arraySection = (
    <React.Fragment>
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
                {getBadgeText ? getBadgeText(value) : value.toString()}
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
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
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
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    instagram: "",
    description: "",
    image: "",
    github: "",
    title: [],
    experience: "",
    projectNumber: "",
    sub: "",
    support: "",
    descriptionLong: "",
    CV: "",
    avatar: "",
    facebook: "",
    twitter: "",
    telegram: "",
    linkedIn: "",
    buyMeACoffee: "",
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
  const [facebook, setFacebook] = React.useState(initialValues.facebook);
  const [twitter, setTwitter] = React.useState(initialValues.twitter);
  const [telegram, setTelegram] = React.useState(initialValues.telegram);
  const [linkedIn, setLinkedIn] = React.useState(initialValues.linkedIn);
  const [buyMeACoffee, setBuyMeACoffee] = React.useState(
    initialValues.buyMeACoffee
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setInstagram(initialValues.instagram);
    setDescription(initialValues.description);
    setImage(initialValues.image);
    setGithub(initialValues.github);
    setTitle(initialValues.title);
    setCurrentTitleValue("");
    setExperience(initialValues.experience);
    setProjectNumber(initialValues.projectNumber);
    setSub(initialValues.sub);
    setSupport(initialValues.support);
    setDescriptionLong(initialValues.descriptionLong);
    setCV(initialValues.CV);
    setAvatar(initialValues.avatar);
    setFacebook(initialValues.facebook);
    setTwitter(initialValues.twitter);
    setTelegram(initialValues.telegram);
    setLinkedIn(initialValues.linkedIn);
    setBuyMeACoffee(initialValues.buyMeACoffee);
    setErrors({});
  };
  const [currentTitleValue, setCurrentTitleValue] = React.useState("");
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
    facebook: [],
    twitter: [],
    telegram: [],
    linkedIn: [],
    buyMeACoffee: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
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
          facebook,
          twitter,
          telegram,
          linkedIn,
          buyMeACoffee,
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
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new User(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={lastName}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={email}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={phone}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={instagram}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={description}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={image}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={github}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
            };
            const result = onChange(modelFields);
            values = result?.title ?? values;
          }
          setTitle(values);
          setCurrentTitleValue("");
        }}
        currentFieldValue={currentTitleValue}
        label={"Title"}
        items={title}
        hasError={errors?.title?.hasError}
        errorMessage={errors?.title?.errorMessage}
        setFieldValue={setCurrentTitleValue}
        inputFieldRef={titleRef}
        defaultFieldValue={""}
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
          labelHidden={true}
          {...getOverrideProps(overrides, "title")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Experience"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={experience}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={projectNumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={sub}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={support}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={descriptionLong}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={CV}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
        value={avatar}
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
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
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
      <TextField
        label="Facebook"
        isRequired={false}
        isReadOnly={false}
        value={facebook}
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
              avatar,
              facebook: value,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee,
            };
            const result = onChange(modelFields);
            value = result?.facebook ?? value;
          }
          if (errors.facebook?.hasError) {
            runValidationTasks("facebook", value);
          }
          setFacebook(value);
        }}
        onBlur={() => runValidationTasks("facebook", facebook)}
        errorMessage={errors.facebook?.errorMessage}
        hasError={errors.facebook?.hasError}
        {...getOverrideProps(overrides, "facebook")}
      ></TextField>
      <TextField
        label="Twitter"
        isRequired={false}
        isReadOnly={false}
        value={twitter}
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
              avatar,
              facebook,
              twitter: value,
              telegram,
              linkedIn,
              buyMeACoffee,
            };
            const result = onChange(modelFields);
            value = result?.twitter ?? value;
          }
          if (errors.twitter?.hasError) {
            runValidationTasks("twitter", value);
          }
          setTwitter(value);
        }}
        onBlur={() => runValidationTasks("twitter", twitter)}
        errorMessage={errors.twitter?.errorMessage}
        hasError={errors.twitter?.hasError}
        {...getOverrideProps(overrides, "twitter")}
      ></TextField>
      <TextField
        label="Telegram"
        isRequired={false}
        isReadOnly={false}
        value={telegram}
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
              avatar,
              facebook,
              twitter,
              telegram: value,
              linkedIn,
              buyMeACoffee,
            };
            const result = onChange(modelFields);
            value = result?.telegram ?? value;
          }
          if (errors.telegram?.hasError) {
            runValidationTasks("telegram", value);
          }
          setTelegram(value);
        }}
        onBlur={() => runValidationTasks("telegram", telegram)}
        errorMessage={errors.telegram?.errorMessage}
        hasError={errors.telegram?.hasError}
        {...getOverrideProps(overrides, "telegram")}
      ></TextField>
      <TextField
        label="Linked in"
        isRequired={false}
        isReadOnly={false}
        value={linkedIn}
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
              avatar,
              facebook,
              twitter,
              telegram,
              linkedIn: value,
              buyMeACoffee,
            };
            const result = onChange(modelFields);
            value = result?.linkedIn ?? value;
          }
          if (errors.linkedIn?.hasError) {
            runValidationTasks("linkedIn", value);
          }
          setLinkedIn(value);
        }}
        onBlur={() => runValidationTasks("linkedIn", linkedIn)}
        errorMessage={errors.linkedIn?.errorMessage}
        hasError={errors.linkedIn?.hasError}
        {...getOverrideProps(overrides, "linkedIn")}
      ></TextField>
      <TextField
        label="Buy me a coffee"
        isRequired={false}
        isReadOnly={false}
        value={buyMeACoffee}
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
              avatar,
              facebook,
              twitter,
              telegram,
              linkedIn,
              buyMeACoffee: value,
            };
            const result = onChange(modelFields);
            value = result?.buyMeACoffee ?? value;
          }
          if (errors.buyMeACoffee?.hasError) {
            runValidationTasks("buyMeACoffee", value);
          }
          setBuyMeACoffee(value);
        }}
        onBlur={() => runValidationTasks("buyMeACoffee", buyMeACoffee)}
        errorMessage={errors.buyMeACoffee?.errorMessage}
        hasError={errors.buyMeACoffee?.hasError}
        {...getOverrideProps(overrides, "buyMeACoffee")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
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
