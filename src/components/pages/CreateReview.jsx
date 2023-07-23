import { useNavigate } from "react-router-native";
import ReviewForm from "../molecules/ReviewForm";
import * as yup from "yup";
import useCreateReview from "../../hooks/useCreateReview";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("rating is required")
    .min(0, "can't be lesser than 0")
    .max(100, "can't be more than 100"),
  text: yup.string(),
});

const initialValues = {
  ownerName: "",
  RepositoryName: "",
  Rating: "",
  text: "",
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      console.log(data);
      navigate(`/repository/${data.createReview.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default CreateReview;
