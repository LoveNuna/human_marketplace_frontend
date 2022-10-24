import { useRouter } from "next/router";
import ShareModal from "@components/modals/share-modal";
import ReportModal from "@components/modals/report-modal";
import ShareDropdown from "@components/share-dropdown";
import { useWalletManager } from "@noahsaso/cosmodal";
import Anchor from "@ui/anchor";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { getImageFromHash } from "@utils/ipfs";
import { useEffect } from "react";
import { useAxios } from "src/hooks";

const UserIntroArea = ({ className, space }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [follow, setFollow] = useState({});
    const { fetchUserInfo, fetchFollowInfo, handleFollow } = useAxios();
    const { connectedWallet } = useWalletManager();
    const { asPath } = useRouter();
    const userAddress = asPath.split("/")[2];
    const fetchFollow = async () => {
        const followInfo = await fetchFollowInfo(userAddress);
        setFollow({
            from: followInfo.from.map((_data) => _data.to_address),
            to: followInfo.to.map((_data) => _data.from_address),
        });
    };
    useEffect(() => {
        (async () => {
            const info = await fetchUserInfo(userAddress);
            setUserInfo(info);
            await fetchFollow();
        })();
    }, [userAddress]);

    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
    const handleReportModal = () => setShowReportModal((prev) => !prev);
    const handleFollowClick = async () => {
        await handleFollow(connectedWallet?.address, userAddress);
        await fetchFollow();
    };
    const userData = useMemo(() => {
        const result = {
            background: {
                src: userInfo.cover
                    ? getImageFromHash(userInfo.cover)
                    : "/images/bg/bg-image-9.png",
            },
            image: {
                alt: "",
                src: userInfo.logo
                    ? getImageFromHash(userInfo.logo)
                    : "/images/icons/boy-avater.png",
            },
            name: userInfo.first_name || "",
        };
        return result;
    }, [userInfo.first_name, userInfo.cover, userInfo.logo]);

    return (
        <>
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <ReportModal
                show={showReportModal}
                handleModal={handleReportModal}
            />
            <div className="rn-author-bg-area position-relative ptb--150">
                <Image
                    src={userData.background.src}
                    alt="Slider BG"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>
            <div
                className={clsx(
                    "rn-author-area",
                    space === 1 && "mb--30 mt_dec--120",
                    className
                )}
            >
                <div className="container">
                    <div className="row padding-tb-50 align-items-center d-flex">
                        <div className="col-lg-12">
                            <div className="author-wrapper">
                                <div className="author-inner">
                                    {userData?.image?.src && (
                                        <div className="user-thumbnail">
                                            <Image
                                                src={userData.image.src}
                                                alt={
                                                    userData.image?.alt ||
                                                    userData.name
                                                }
                                                width={140}
                                                height={140}
                                                layout="fixed"
                                            />
                                        </div>
                                    )}

                                    <div className="rn-author-info-content">
                                        <h4 className="title">
                                            {userData.name}
                                        </h4>
                                        {/* <a
                                            href="https://twitter.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="social-follw"
                                        >
                                            <i className="feather-twitter" />
                                            <span className="user-name">
                                                {userData.twitter}
                                            </span>
                                        </a> */}
                                        <div className="follow-area">
                                            <div className="follow followers">
                                                <span>
                                                    {follow.to &&
                                                        follow.to.length}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        followers
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="follow following">
                                                <span>
                                                    {follow.from &&
                                                        follow.from.length}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        following
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="author-button-area">
                                            {connectedWallet && (
                                                <span
                                                    className="btn at-follw follow-button"
                                                    onClick={handleFollowClick}
                                                >
                                                    <i className="feather-user-plus" />
                                                    {follow.to &&
                                                    follow.to.includes(
                                                        connectedWallet?.address
                                                    )
                                                        ? "Unfollow"
                                                        : "Follow"}
                                                </span>
                                            )}
                                            <button
                                                type="button"
                                                className="btn at-follw share-button"
                                                onClick={shareModalHandler}
                                            >
                                                <i className="feather-share-2" />
                                            </button>

                                            <button
                                                type="button"
                                                // className="btn-setting-text report-text"
                                                className="btn at-follw"
                                                onClick={handleReportModal}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-flag"
                                                >
                                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                                    <line x1="4" y1="22" x2="4" y2="15"></line>
                                                </svg>
                                            </button>
                                            {/* <div className="count at-follw">
                                                <ShareDropdown />
                                            </div> */}
                                            {/* <Anchor
                                                path="/edit-profile"
                                                className="btn at-follw follow-button edit-btn"
                                            >
                                                <i className="feather feather-edit" />
                                            </Anchor> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

UserIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
UserIntroArea.defaultProps = {
    space: 1,
};

export default UserIntroArea;
