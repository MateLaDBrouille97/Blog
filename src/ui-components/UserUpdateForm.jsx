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
import { User } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
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
  runValidationTasks,
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
    const { hasError } = runValidationTasks();
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
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
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
    image: "",
    avatar: "",
    CV: "",
    descriptionLong: "",
    description: "",
    experience: "",
    projectNumber: "",
    support: "",
    titles: [],
    email: "",
    phone: "",
    github: "",
    buyMeACoffee: "",
    facebook: "",
    twitter: "",
    instagram: "",
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [image, setImage] = React.useState(initialValues.image);
  const [avatar, setAvatar] = React.useState(initialValues.avatar);
  const [CV, setCV] = React.useState(initialValues.CV);
  const [descriptionLong, setDescriptionLong] = React.useState(
    initialValues.descriptionLong
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [experience, setExperience] = React.useState(initialValues.experience);
  const [projectNumber, setProjectNumber] = React.useState(
    initialValues.projectNumber
  );
  const [support, setSupport] = React.useState(initialValues.support);
  const [titles, setTitles] = React.useState(initialValues.titles);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [github, setGithub] = React.useState(initialValues.github);
  const [buyMeACoffee, setBuyMeACoffee] = React.useState(
    initialValues.buyMeACoffee
  );
  const [facebook, setFacebook] = React.useState(initialValues.facebook);
  const [twitter, setTwitter] = React.useState(initialValues.twitter);
  const [instagram, setInstagram] = React.useState(initialValues.instagram);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setImage(cleanValues.image);
    setAvatar(cleanValues.avatar);
    setCV(cleanValues.CV);
    setDescriptionLong(cleanValues.descriptionLong);
    setDescription(cleanValues.description);
    setExperience(cleanValues.experience);
    setProjectNumber(cleanValues.projectNumber);
    setSupport(cleanValues.support);
    setTitles(cleanValues.titles ?? []);
    setCurrentTitlesValue("");
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setGithub(cleanValues.github);
    setBuyMeACoffee(cleanValues.buyMeACoffee);
    setFacebook(cleanValues.facebook);
    setTwitter(cleanValues.twitter);
    setInstagram(cleanValues.instagram);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(User, idProp)
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const [currentTitlesValue, setCurrentTitlesValue] = React.useState("");
  const titlesRef = React.createRef();
  const validations = {
    firstName: [],
    lastName: [],
    image: [],
    avatar: [],
    CV: [],
    descriptionLong: [],
    description: [],
    experience: [],
    projectNumber: [],
    support: [],
    titles: [],
    email: [{ type: "Email" }],
    phone: [{ type: "Phone" }],
    github: [],
    buyMeACoffee: [],
    facebook: [],
    twitter: [],
    instagram: [],
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
          image,
          avatar,
          CV,
          descriptionLong,
          description,
          experience,
          projectNumber,
          support,
          titles,
          email,
          phone,
          github,
          buyMeACoffee,
          facebook,
          twitter,
          instagram,
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
      {...getOverrideProps(overrides, "UserUpdateForm")}
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image: value,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar: value,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV: value,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong: value,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description: value,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience: value,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber: value,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
        label="Support"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={support}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support: value,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles: values,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
            };
            const result = onChange(modelFields);
            values = result?.titles ?? values;
          }
          setTitles(values);
          setCurrentTitlesValue("");
        }}
        currentFieldValue={currentTitlesValue}
        label={"Titles"}
        items={titles}
        hasError={errors?.titles?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("titles", currentTitlesValue)
        }
        errorMessage={errors?.titles?.errorMessage}
        setFieldValue={setCurrentTitlesValue}
        inputFieldRef={titlesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Titles"
          isRequired={false}
          isReadOnly={false}
          value={currentTitlesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.titles?.hasError) {
              runValidationTasks("titles", value);
            }
            setCurrentTitlesValue(value);
          }}
          onBlur={() => runValidationTasks("titles", currentTitlesValue)}
          errorMessage={errors.titles?.errorMessage}
          hasError={errors.titles?.hasError}
          ref={titlesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "titles")}
        ></TextField>
      </ArrayField>
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email: value,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone: value,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github: value,
              buyMeACoffee,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee: value,
              facebook,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook: value,
              twitter,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter: value,
              instagram,
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
              image,
              avatar,
              CV,
              descriptionLong,
              description,
              experience,
              projectNumber,
              support,
              titles,
              email,
              phone,
              github,
              buyMeACoffee,
              facebook,
              twitter,
              instagram: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
