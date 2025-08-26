import { Helmet } from "react-helmet-async";

type HelmetTitleProps = {
  title?: string;
  description?: string;
};

const HelmetTitle = ({
  title = "PayWallet",
  description = "PayWallet is a digital wallet for payments",
}: HelmetTitleProps) => {
  return (
    <Helmet>
      <title>{title ? `${title} - PayWallet` : "PayWallet"}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default HelmetTitle;
