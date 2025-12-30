import type { Field } from '$lib/types/field';

class FlowForm {
	private static instance: FlowForm;
	fields: Field[] = $state([]);
	currentIndex: number = $state(0);
	currentField: Field | null = $derived(this.fields[this.currentIndex]);
	answers: Record<string, any> = $state({});

	private constructor() {
		this.fields = [];
	}

	public static getInstance(): FlowForm {
		if (!FlowForm.instance) {
			FlowForm.instance = new FlowForm();
		}
		return FlowForm.instance;
	}

	setCurrentIndex(index: number) {
		this.currentIndex = index;
	}

	setAnswer(id: string, value: any) {
		this.answers = { ...this.answers, [id]: value };
	}

	// Method to validate answers
	validateAnswers(): { valid: boolean; errors: { [key: string]: string } } {
		const errors: { [key: string]: string } = {};
		let valid = true;
		this.fields.forEach((field: Field) => {
			const value = this.answers[field.id];

			if (field.isRequired && (value === undefined || value === null || value === '')) {
				valid = false;
				errors[field.id] = 'This field is required.';
			}
		});

		return { valid, errors };
	}

	// Method to validate required for submission
	validateRequiredForSubmission(): { valid: boolean; errors: { [key: string]: string } } {
		const errors: { [key: string]: string } = {};
		let valid = true;
		this.fields.forEach((field: Field) => {
			const value = this.answers[field.id];

			if (field.isRequired && (value === undefined || value === null || value === '')) {
				valid = false;
				errors[field.id] = 'This field is required.';
			}
		});

		return { valid, errors };
	}

	// Form State Management Methods
	resetForm(): void {
		this.answers = {};
		this.currentIndex = 0;
	}

	clearAnswer(id: string): void {
		const { [id]: _, ...rest } = this.answers;
		this.answers = rest;
	}

	getAnswers(): Record<string, any> {
		return { ...this.answers };
	}

	isFormComplete(): boolean {
		const requiredFields = this.fields.filter((field) => field.isRequired);
		return requiredFields.every((field) => {
			const value = this.answers[field.id];
			return value !== undefined && value !== null && value !== '';
		});
	}

	// Form Progress Methods
	getProgress(): number {
		const totalFields = this.fields.length;
		if (totalFields === 0) return 0;

		const answeredFields = this.fields.filter((field) => {
			const value = this.answers[field.id];
			return value !== undefined && value !== null && value !== '';
		}).length;

		return Math.round((answeredFields / totalFields) * 100);
	}

	getTotalFields(): number {
		return this.fields.length;
	}

	getCurrentProgress(): { current: number; total: number } {
		return {
			current: this.currentIndex + 1,
			total: this.fields.length
		};
	}

	setFields(fields: Field[]): void {
		this.fields = fields;
	}
}

export const flowForm = FlowForm.getInstance();

