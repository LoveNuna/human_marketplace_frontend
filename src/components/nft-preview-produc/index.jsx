import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import ClientAvatar from "@ui/client-avatar";
import { ImageType } from "@utils/types";

const NftPreviewProduct = ({ overlay, title, image, client, metadata }) => (
    <div className={clsx("product-style-one", !overlay && "no-overlay")}>
        <div className="card-thumbnail">
            {image?.src && (
                <Image
                    src={image.src}
                    alt={image?.alt || "NFT_portfolio"}
                    width={533}
                    height={533}
                />
            )}
        </div>
        <div className="product-share-wrapper">
            <div className="profile-share">
                {client && (
                    <ClientAvatar
                        key={client.name}
                        slug={client.slug}
                        name={client.name}
                        image={client.image}
                    />
                )}
            </div>
        </div>
        <span className="product-name">{title}</span>
        <div className="mt-3">Metadata</div>
        <div className="container border p-4">
            {Object.keys(metadata).map((key) => {
                if (key === "attributes") return null;
                const value = metadata[key];
                return (
                    <div className="row" key={key}>
                        <div className="col-md-4">{key}</div>
                        <div className="col-md-8">{value}</div>
                    </div>
                );
            })}
            {metadata?.attributes && (
                <>
                    <div>Attributes</div>
                    <div className="container">
                        {Object.keys(metadata.attributes).map(
                            (attributeField) => {
                                const attributeValue =
                                    metadata.attributes[attributeField];
                                return (
                                    <div className="row" key={attributeField}>
                                        <div className="col-md-4">
                                            {attributeField}
                                        </div>
                                        <div className="col-md-8">
                                            {attributeValue}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    </div>
);

NftPreviewProduct.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    image: ImageType.isRequired,
    client: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        image: ImageType.isRequired,
    }),
    metadata: PropTypes.shape({
        attributes: PropTypes.shape({}),
    }).isRequired,
};

NftPreviewProduct.defaultProps = {
    overlay: false,
};

export default NftPreviewProduct;
