import {
	Text,
	Lock,
	AlignLeft,
	Hash,
	Phone,
	Tag,
	ChevronsUpDown,
	ListFilter,
	CheckSquare,
	CircleDot,
	ToggleLeft,
	Calendar,
	CalendarClock,
	CalendarRange,
	File,
	PenTool,
	MapPin,
	Sliders,
	Star,
	type Icon as IconType
} from 'lucide-svelte';

/** Enum representing different field types */
export enum FieldType {
	Input = 'input',
	Password = 'password',
	Textarea = 'textarea',
	InputOtp = 'input_otp',
	Phone = 'phone',
	TagsInput = 'tags_input',
	Select = 'select',
	Combobox = 'combobox',
	MultiSelect = 'multi_select',
	RadioGroup = 'radio_group',
	Checkbox = 'checkbox',
	Switch = 'switch',
	DatePicker = 'date_picker',
	DatetimePicker = 'datetime_picker',
	SmartDatetime = 'smart_datetime',
	FileInput = 'file_input',
	Signature = 'signature',
	Location = 'location',
	Slider = 'slider',
	Rating = 'rating',
	Contact = 'contact',
	yesNo = 'yes_no',
}

/** Interface representing a select option in dropdowns or multiple choice fields */
export interface SelectOption {
	/** The value of the option */
	value: string;
	/** The label displayed for the option */
	label: string;
	/** Additional description for the option */
	description?: string;
	/** Additional description for the option */
	checked?: boolean;
	/** URL of the image associated with the option */
	imageUrl?: string;
}

/** Interface representing text-specific field options */
export interface TextOptions {
	/** Maximum allowed length */
	maxLength?: number;
	/** Minimum required length */
	minLength?: number;
	/** Default value for the field */
	defaultValue?: string;
}

/** Interface representing number-specific field options */
export interface NumberOptions {
	/** Minimum allowed value */
	min?: number;
	/** Maximum allowed value */
	max?: number;
	/** Default value for the field */
	defaultValue?: number;
}

/** Interface representing select-specific field options */
export interface SelectOptions {
	/** Options available for selection */
	selectOptions: SelectOption[];
	/** Whether multiple selections are allowed */
	isMultiselect?: boolean;
	/** Default selected value(s) */
	defaultValue?: string | string[];
}

/** Interface representing rating-specific field options */
export interface RatingOptions {
	/** Maximum rating value */
	maxRating?: number;
	/** Default rating value */
	defaultValue?: number;
}

/** Interface representing date-specific field options */
export interface DateOptions {
	/** Minimum allowed date */
	minDate?: Date;
	/** Maximum allowed date */
	maxDate?: Date;
	/** Default date value */
	defaultValue?: Date;
}

/** Interface representing file upload-specific field options */
export interface FileUploadOptions {
	/** Allowed file types */
	allowedFileTypes?: string[];
	/** Maximum file size in bytes */
	maxFileSize?: number;
}

/** Union type for field options based on field type */
export type FieldOptions =
	| TextOptions
	| NumberOptions
	| SelectOptions
	| RatingOptions
	| DateOptions
	| FileUploadOptions;

/** Generic interface representing a form field */
export interface Field<TOptions = any> {
	/** Unique identifier for the field */
	id: string;
	/** Name for the field (used in form binding and data structure) */
	name: string;
	/** The label displayed for the field */
	label: string;
	/** Type of the field */
	type: FieldType;
	/** Options specific to the field type */
	options?: TOptions;
	/** Indicates if the field is required to be filled out by the user */
	isRequired: boolean;
	/** Placeholder text for the field */
	placeholder?: string;
	/** Order of the field in the form */
	order: number;
	/** Helper text for the field (maps to Form.Description) */
	helperText?: string;
	/** Description of the field (alternative to helperText) */
	description?: string;
	/** Default value for the field */
	defaultValue?: any;
	/** Whether to show error messages for this field */
	showErrors?: boolean;
}

// Form field display structure with icons
export type FormFieldDisplay = {
	id: string;
	name: string;
	isNew: boolean;
	icon: typeof IconType;
};

export type FormFieldCategory = {
	[key: string]: FormFieldDisplay[];
};

/** Interface for a form schema */
export interface FormSchema {
	/** The id of the form */
	id: string;
	/** The title of the form */
	title: string;
	/** The fields in the form */
	fields: Field[];
	/** Any additional metadata for the form */
	metadata?: Record<string, any>;
}

/** Utility type for extracting field values from a form */
export type FormValues<T extends FormSchema> = {
	[K in T['fields'][number]['name']]: any;
};

export const formFieldCategories: FormFieldCategory = {
	textInputFields: [
		{ id: FieldType.Input, name: 'Input', isNew: false, icon: Text },
		{ id: FieldType.Password, name: 'Password', isNew: false, icon: Lock },
		{ id: FieldType.Textarea, name: 'Textarea', isNew: false, icon: AlignLeft },
		{ id: FieldType.InputOtp, name: 'Input OTP', isNew: false, icon: Hash },
		{ id: FieldType.Phone, name: 'Phone', isNew: false, icon: Phone },
		{ id: FieldType.TagsInput, name: 'Tags Input', isNew: false, icon: Tag }
	],
	selectionFields: [
		{ id: FieldType.Select, name: 'Select', isNew: false, icon: ChevronsUpDown },
		{ id: FieldType.Combobox, name: 'Combobox', isNew: false, icon: ListFilter },
		{ id: FieldType.MultiSelect, name: 'Multi Select', isNew: false, icon: CheckSquare },
		{ id: FieldType.RadioGroup, name: 'RadioGroup', isNew: true, icon: CircleDot },
		{ id: FieldType.Checkbox, name: 'Checkbox', isNew: false, icon: CheckSquare },
		{ id: FieldType.Switch, name: 'Switch', isNew: false, icon: ToggleLeft }
	],
	dateTimeFields: [
		{ id: FieldType.DatePicker, name: 'Date Picker', isNew: false, icon: Calendar },
		{ id: FieldType.DatetimePicker, name: 'Datetime Picker', isNew: false, icon: CalendarClock },
		{ id: FieldType.SmartDatetime, name: 'Smart Datetime Input', isNew: true, icon: CalendarRange }
	],
	specialInputTypes: [
		{ id: FieldType.FileInput, name: 'File Input', isNew: false, icon: File },
		{ id: FieldType.Signature, name: 'Signature Input', isNew: true, icon: PenTool },
		{ id: FieldType.Location, name: 'Location Input', isNew: true, icon: MapPin },
		{ id: FieldType.Slider, name: 'Slider', isNew: false, icon: Sliders },
		{ id: FieldType.Rating, name: 'Rating', isNew: true, icon: Star }
	]
};

/**
 * Returns the appropriate icon component for a given field type
 * @param fieldType The type of field to get the icon for
 * @returns The icon component for the field type
 */
export function getFieldIcon(fieldType: FieldType): typeof IconType {
	// Look through all categories to find the field
	for (const category of Object.values(formFieldCategories)) {
		const field = category.find((field) => field.id === fieldType);
		if (field) {
			return field.icon;
		}
	}

	// Fallback to text icon if not found
	return Text;
}

