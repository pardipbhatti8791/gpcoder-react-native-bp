import * as Yup from 'yup';

export const MANUAL_SHIFT_SCHEMA = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    location: Yup.string().required('Location is required'),
});
