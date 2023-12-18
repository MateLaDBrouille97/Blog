/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBlogPost = /* GraphQL */ `
  mutation CreateBlogPost(
    $input: CreateBlogPostInput!
    $condition: ModelBlogPostConditionInput
  ) {
    createBlogPost(input: $input, condition: $condition) {
      id
      slug
      image
      category
      subcategory
      description
      title
      subtitle
      href
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBlogPost = /* GraphQL */ `
  mutation UpdateBlogPost(
    $input: UpdateBlogPostInput!
    $condition: ModelBlogPostConditionInput
  ) {
    updateBlogPost(input: $input, condition: $condition) {
      id
      slug
      image
      category
      subcategory
      description
      title
      subtitle
      href
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBlogPost = /* GraphQL */ `
  mutation DeleteBlogPost(
    $input: DeleteBlogPostInput!
    $condition: ModelBlogPostConditionInput
  ) {
    deleteBlogPost(input: $input, condition: $condition) {
      id
      slug
      image
      category
      subcategory
      description
      title
      subtitle
      href
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createService = /* GraphQL */ `
  mutation CreateService(
    $input: CreateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    createService(input: $input, condition: $condition) {
      id
      firstName
      lastName
      description
      serviceData
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateService = /* GraphQL */ `
  mutation UpdateService(
    $input: UpdateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    updateService(input: $input, condition: $condition) {
      id
      firstName
      lastName
      description
      serviceData
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteService = /* GraphQL */ `
  mutation DeleteService(
    $input: DeleteServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    deleteService(input: $input, condition: $condition) {
      id
      firstName
      lastName
      description
      serviceData
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createQualification = /* GraphQL */ `
  mutation CreateQualification(
    $input: CreateQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    createQualification(input: $input, condition: $condition) {
      id
      name
      institute
      calendarBegin
      calendarEnd
      type
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateQualification = /* GraphQL */ `
  mutation UpdateQualification(
    $input: UpdateQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    updateQualification(input: $input, condition: $condition) {
      id
      name
      institute
      calendarBegin
      calendarEnd
      type
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteQualification = /* GraphQL */ `
  mutation DeleteQualification(
    $input: DeleteQualificationInput!
    $condition: ModelQualificationConditionInput
  ) {
    deleteQualification(input: $input, condition: $condition) {
      id
      name
      institute
      calendarBegin
      calendarEnd
      type
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPortfolioPost = /* GraphQL */ `
  mutation CreatePortfolioPost(
    $input: CreatePortfolioPostInput!
    $condition: ModelPortfolioPostConditionInput
  ) {
    createPortfolioPost(input: $input, condition: $condition) {
      id
      title
      description
      image
      technologies
      addressPost
      type
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePortfolioPost = /* GraphQL */ `
  mutation UpdatePortfolioPost(
    $input: UpdatePortfolioPostInput!
    $condition: ModelPortfolioPostConditionInput
  ) {
    updatePortfolioPost(input: $input, condition: $condition) {
      id
      title
      description
      image
      technologies
      addressPost
      type
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePortfolioPost = /* GraphQL */ `
  mutation DeletePortfolioPost(
    $input: DeletePortfolioPostInput!
    $condition: ModelPortfolioPostConditionInput
  ) {
    deletePortfolioPost(input: $input, condition: $condition) {
      id
      title
      description
      image
      technologies
      addressPost
      type
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $input: CreateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    createSkill(input: $input, condition: $condition) {
      id
      name
      level
      type
      userID
      href
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill(
    $input: UpdateSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    updateSkill(input: $input, condition: $condition) {
      id
      name
      level
      type
      userID
      href
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill(
    $input: DeleteSkillInput!
    $condition: ModelSkillConditionInput
  ) {
    deleteSkill(input: $input, condition: $condition) {
      id
      name
      level
      type
      userID
      href
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      image
      avatar
      CV
      descriptionLong
      description
      experience
      projectNumber
      support
      titles
      email
      phone
      github
      buyMeACoffee
      facebook
      twitter
      instagram
      Qualifications {
        nextToken
        __typename
      }
      Skills {
        nextToken
        __typename
      }
      PortfolioPosts {
        nextToken
        __typename
      }
      Services {
        nextToken
        __typename
      }
      BlogPosts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      image
      avatar
      CV
      descriptionLong
      description
      experience
      projectNumber
      support
      titles
      email
      phone
      github
      buyMeACoffee
      facebook
      twitter
      instagram
      Qualifications {
        nextToken
        __typename
      }
      Skills {
        nextToken
        __typename
      }
      PortfolioPosts {
        nextToken
        __typename
      }
      Services {
        nextToken
        __typename
      }
      BlogPosts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      image
      avatar
      CV
      descriptionLong
      description
      experience
      projectNumber
      support
      titles
      email
      phone
      github
      buyMeACoffee
      facebook
      twitter
      instagram
      Qualifications {
        nextToken
        __typename
      }
      Skills {
        nextToken
        __typename
      }
      PortfolioPosts {
        nextToken
        __typename
      }
      Services {
        nextToken
        __typename
      }
      BlogPosts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
