import React, { useState } from "react";
import type { Config } from "@measured/puck";

type FormField = {
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "radio"
    | "checkbox"
    | "select"
    | "textarea";
  options?: { value: string }[];
  placeholder?: string;
};

type Props = {
  HeadingBlock: { title: string };
  Form: {
    fields: FormField[];
    title?: string;
    description?: string;
  };
  Button: { label: string; onClick: () => void };
  Card: { title: string; content: string };
};

const FormComponent: React.FC<{
  fields: FormField[];
  title?: string;
  description?: string;
}> = ({ fields, title, description }) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleInputChange = (fieldIndex: number, value: string | boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldIndex]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form values:", formValues);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        {title && <h2 className="form-heading">{title}</h2>}
        {description && <p className="form-description">{description}</p>}
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => {
            const commonLabelClasses = "form-label";
            const commonInputClasses = "form-input";

            switch (field.type) {
              case "radio":
                return (
                  <div key={index} className="form-field">
                    <label className={commonLabelClasses}>{field.label}</label>
                    <div className="radio-group">
                      {field.options?.map((option) => (
                        <label key={option.value} className="radio-item">
                          <input
                            type="radio"
                            name={`field-${index}`}
                            value={option.value}
                            checked={formValues[index] === option.value}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            className="radio-input"
                          />
                          <span>{option.value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );

              case "select":
                return (
                  <div key={index} className="form-field">
                    <label className={commonLabelClasses}>{field.label}</label>
                    <select
                      className={`form-select`}
                      value={formValues[index] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                  </div>
                );

              case "checkbox":
                return (
                  <div key={index} className="form-field">
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formValues[index] || false}
                        onChange={(e) =>
                          handleInputChange(index, e.target.checked)
                        }
                        className="checkbox-input"
                      />
                      {field.label}
                    </label>
                  </div>
                );

              case "textarea":
                return (
                  <div key={index} className="form-field">
                    <label className={commonLabelClasses}>{field.label}</label>
                    <textarea
                      className={`form-textarea`}
                      placeholder={field.placeholder}
                      value={formValues[index] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </div>
                );

              default:
                return (
                  <div key={index} className="form-field">
                    <label className={commonLabelClasses}>{field.label}</label>
                    <input
                      type={field.type}
                      className={`${commonInputClasses}`}
                      placeholder={field.placeholder}
                      value={formValues[index] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </div>
                );
            }
          })}

          <div className="form-field">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ButtonComponent: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => {
  return (
    <button className="submit-button" onClick={onClick}>
      {label}
    </button>
  );
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    Form: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        fields: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            placeholder: { type: "text" },
            type: {
              type: "select",
              options: [
                { value: "text", label: "Text Input" },
                { value: "number", label: "Number Input" },
                { value: "email", label: "Email Input" },
                { value: "tel", label: "Telephone Input" },
                { value: "radio", label: "Radio Buttons" },
                { value: "checkbox", label: "Checkbox" },
                { value: "select", label: "Select Dropdown" },
                { value: "textarea", label: "Text Area" },
              ],
            },
            options: {
              type: "array",
              arrayFields: {
                value: { type: "text" },
              },
              hidden: (field: { type: { value: string } }) =>
                !["radio", "select"].includes(field.type.value),
            },
          },
          getItemSummary: (item) => item.label || "New Field",
        },
      },
      defaultProps: {
        fields: [],
        title: "Contact Form",
        description: "Please fill out the form below",
      },
      render: (props) => <FormComponent {...props} />,
    },
    Button: {
      fields: {
        label: { type: "text" },
      },
      defaultProps: {
        label: "Click Me",
      },
      render: ({ label }) => (
        <ButtonComponent
          label={label}
          onClick={() => alert("Button clicked!")}
        />
      ),
    },
  },
};

export default config;
