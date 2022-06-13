import { Field, emailRegex } from 'types'

enum Messages {
  NOT_BE_BLANK = 'This field can not be blank.',
  AT_LEAST_5_CHARACTERS = 'This field must be at least 5 characters long.',
  MAXIMUM_30_CHARACTERS = 'This field must have a maximum of 30 characters.',
  FIELD_INVALID = 'This field is invalid.',
  AT_LEAST_2_CHARACTERS = 'This field must be at least 2 characters long.'
}

export const createClientFields: Field[] = [
  {
    name: 'first_name',
    autoComplete: 'off',
    placeholder: "Enter the client's first name",
    rules: {
      minLength: {
        value: 2,
        message: Messages.AT_LEAST_2_CHARACTERS
      },
      maxLength: {
        value: 30,
        message: Messages.MAXIMUM_30_CHARACTERS
      },
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      }
    },
    type: 'text'
  },
  {
    name: 'last_name',
    autoComplete: 'off',
    placeholder: "Enter the client's last name",
    rules: {
      minLength: {
        value: 2,
        message: Messages.AT_LEAST_2_CHARACTERS
      },
      maxLength: {
        value: 30,
        message: Messages.MAXIMUM_30_CHARACTERS
      },
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      }
    },
    type: 'text'
  },
  {
    name: 'company',
    autoComplete: 'off',
    placeholder: "Enter the client's company",
    rules: {
      minLength: {
        value: 2,
        message: Messages.AT_LEAST_2_CHARACTERS
      },
      maxLength: {
        value: 30,
        message: Messages.MAXIMUM_30_CHARACTERS
      },
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      }
    },
    type: 'text'
  },
  {
    type: 'text',
    autoComplete: 'off',
    name: 'email',
    placeholder: "Enter the client's email",
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      pattern: { value: emailRegex, message: Messages.FIELD_INVALID }
    }
  },
  {
    name: 'phone_number',
    autoComplete: 'off',
    placeholder: "Enter the client's phone number",
    rules: {
      minLength: {
        value: 5,
        message: Messages.AT_LEAST_5_CHARACTERS
      },
      maxLength: {
        value: 30,
        message: Messages.MAXIMUM_30_CHARACTERS
      }
    },
    type: 'text'
  }
]

export const loginFields: Field[] = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      pattern: {
        value: emailRegex,
        message: Messages.FIELD_INVALID
      }
    },
    autoComplete: 'email'
  },
  {
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    placeholder: 'Enter your password',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      minLength: {
        value: 5,
        message: Messages.AT_LEAST_5_CHARACTERS
      }
    }
  }
]

export const signupFields: Field[] = [
  {
    type: 'text',
    placeholder: 'Enter your first name',
    name: 'first_name',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      minLength: {
        value: 5,
        message: Messages.AT_LEAST_5_CHARACTERS
      },
      maxLength: {
        value: 30,
        message: Messages.MAXIMUM_30_CHARACTERS
      }
    },
    autoComplete: 'first-name'
  },
  {
    type: 'text',
    placeholder: 'Enter your last name',
    name: 'last_name',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      minLength: {
        value: 5,
        message: Messages.AT_LEAST_5_CHARACTERS
      },
      maxLength: {
        value: 30,
        message: Messages.MAXIMUM_30_CHARACTERS
      }
    },
    autoComplete: 'last-name'
  },
  {
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      pattern: {
        value: emailRegex,
        message: Messages.FIELD_INVALID
      }
    },
    autoComplete: 'email'
  },
  {
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      minLength: {
        value: 5,
        message: Messages.AT_LEAST_5_CHARACTERS
      }
    },
    autoComplete: 'current-password'
  },
  {
    type: 'password',
    placeholder: 'Confirm your password',
    name: 'confirm_password',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      minLength: {
        value: 5,
        message: Messages.AT_LEAST_5_CHARACTERS
      }
    },
    autoComplete: 'confirm-password'
  }
]

export const createProduct: Field[] = [
  {
    name: 'name',
    autoComplete: 'off',
    placeholder: "Enter the product's name",
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      },
      minLength: {
        value: 2,
        message: Messages.AT_LEAST_2_CHARACTERS
      },
      maxLength: {
        value: 30,
        message: Messages.MAXIMUM_30_CHARACTERS
      }
    },
    type: 'text'
  },
  {
    name: 'price',
    autoComplete: 'off',
    placeholder: "Enter the product's price",
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      }
    },
    type: 'number',
    min: '1000',
    step: '100'
  },
  {
    autoComplete: 'off',
    name: 'stock',
    rules: {
      required: {
        value: true,
        message: Messages.NOT_BE_BLANK
      }
    },
    type: 'number',
    placeholder: "Enter the product's stcok",
    min: '1',
    step: '1'
  }
]

export default { createClientFields, loginFields, signupFields, createProduct }
