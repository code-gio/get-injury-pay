<script lang="ts">
	import Flowform from '$lib/components/flowform/flowform.svelte';
	import { type Field, FieldType } from '$lib/types/field.js';

	const fields: Field[] = [
		{
			id: 'accidentType',
			name: 'accidentType',
			label: 'What type of accident were you involved in?',
			type: FieldType.RadioGroup,
			isRequired: true,
			order: 1,
			options: {
				selectOptions: [
					{ value: 'car', label: 'Car Accident' },
					{ value: 'slip', label: 'Slip and Fall' },
					{ value: 'work', label: 'Workplace Accident' },
					{ value: 'medical', label: 'Medical Malpractice' },
					{ value: 'other', label: 'Other' }
				]
			}
		},

		{
			id: 'timeFrame',
			name: 'timeFrame',
			label: 'Please select the time frame of the accident:',
			type: FieldType.RadioGroup,
			isRequired: true,
			order: 2,
			options: {
				selectOptions: [
					{ value: 'recent', label: 'Within the last 2 years' },
					{ value: 'older', label: 'More than 2 years ago' }
				]
			}
		},

		{
			id: 'injuries',
			name: 'injuries',
			label: 'What is the nature of your injuries?',
			type: FieldType.Textarea,
			isRequired: true,
			order: 3,
			placeholder: 'Please describe your injuries in detail',
			options: {
				maxLength: 1000,
				defaultValue: ''
			}
		},

		{
			id: 'physicallyInjured',
			name: 'physicallyInjured',
			label: 'Were you physically injured or in pain?',
			type: FieldType.yesNo,
			isRequired: true,
			order: 4
		},
		{
			id: 'accidentYourFault',
			name: 'accidentYourFault',
			label: 'Was the accident your fault?',
			type: FieldType.yesNo,
			isRequired: true,
			order: 5
		},
		{
			id: 'attorneyInvolved',
			name: 'attorneyInvolved',
			label:
				'Is an attorney already helping you with your claim or has an attorney already rejected your claim?',
			type: FieldType.yesNo,
			isRequired: true,
			order: 6
		},
		{
			id: 'insuranceCoverage',
			name: 'insuranceCoverage',
			label: 'Does anyone involved have vehicle insurance coverage?',
			type: FieldType.yesNo,
			isRequired: true,
			order: 7
		},
		{
			id: 'hospitalOrMissedWork',
			name: 'hospitalOrMissedWork',
			label: 'Did the accident cause hospitalization, medical treatment, surgery, or missed work?',
			type: FieldType.yesNo,
			isRequired: true,
			order: 8
		},
		{
			id: 'policeReportFiled',
			name: 'policeReportFiled',
			label: 'Was a police report filed?',
			type: FieldType.yesNo,
			isRequired: true,
			order: 9
		},
		{
			id: 'occurInNevada',
			name: 'occurInNevada',
			label: 'Did this occur in Nevada?',
			type: FieldType.yesNo,
			isRequired: false,
			order: 11,
			options: {
				selectOptions: [
					{ value: 'yes', label: 'Yes' },
					{ value: 'no', label: 'No' }
				]
			}
		},
		{
			id: 'additionalDetails',
			name: 'additionalDetails',
			label: 'Please share any other important details about the accident',
			type: FieldType.Textarea,
			isRequired: true,
			order: 12,
			placeholder: 'Provide any context or extra information that might help your case',
			options: {
				maxLength: 1000,
				defaultValue: ''
			}
		},
		{
			id: 'personalInfo',
			name: 'personalInfo',
			label: 'To receive your personalized results, please provide the following information:',
			type: FieldType.Contact,
			isRequired: true,
			order: 8,
			placeholder: 'Please provide your contact information and any additional details',
			options: {
				maxLength: 1000,
				defaultValue: ''
			}
		}
	];
</script>

<Flowform {fields} />
