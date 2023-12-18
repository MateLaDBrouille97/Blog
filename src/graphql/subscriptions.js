/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBlogPost = /* GraphQL */ `
  subscription OnCreateBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onCreateBlogPost(filter: $filter) {
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
export const onUpdateBlogPost = /* GraphQL */ `
  subscription OnUpdateBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onUpdateBlogPost(filter: $filter) {
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
export const onDeleteBlogPost = /* GraphQL */ `
  subscription OnDeleteBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onDeleteBlogPost(filter: $filter) {
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
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService($filter: ModelSubscriptionServiceFilterInput) {
    onCreateService(filter: $filter) {
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
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService($filter: ModelSubscriptionServiceFilterInput) {
    onUpdateService(filter: $filter) {
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
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService($filter: ModelSubscriptionServiceFilterInput) {
    onDeleteService(filter: $filter) {
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
export const onCreateQualification = /* GraphQL */ `
  subscription OnCreateQualification(
    $filter: ModelSubscriptionQualificationFilterInput
  ) {
    onCreateQualification(filter: $filter) {
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
export const onUpdateQualification = /* GraphQL */ `
  subscription OnUpdateQualification(
    $filter: ModelSubscriptionQualificationFilterInput
  ) {
    onUpdateQualification(filter: $filter) {
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
export const onDeleteQualification = /* GraphQL */ `
  subscription OnDeleteQualification(
    $filter: ModelSubscriptionQualificationFilterInput
  ) {
    onDeleteQualification(filter: $filter) {
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
export const onCreatePortfolioPost = /* GraphQL */ `
  subscription OnCreatePortfolioPost(
    $filter: ModelSubscriptionPortfolioPostFilterInput
  ) {
    onCreatePortfolioPost(filter: $filter) {
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
export const onUpdatePortfolioPost = /* GraphQL */ `
  subscription OnUpdatePortfolioPost(
    $filter: ModelSubscriptionPortfolioPostFilterInput
  ) {
    onUpdatePortfolioPost(filter: $filter) {
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
export const onDeletePortfolioPost = /* GraphQL */ `
  subscription OnDeletePortfolioPost(
    $filter: ModelSubscriptionPortfolioPostFilterInput
  ) {
    onDeletePortfolioPost(filter: $filter) {
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
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill($filter: ModelSubscriptionSkillFilterInput) {
    onCreateSkill(filter: $filter) {
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
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill($filter: ModelSubscriptionSkillFilterInput) {
    onUpdateSkill(filter: $filter) {
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
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill($filter: ModelSubscriptionSkillFilterInput) {
    onDeleteSkill(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
