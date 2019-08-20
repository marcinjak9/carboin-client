import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import classNames from "classnames";
import { toast } from "react-toastify";
import Container from "../../Components/Container";
import AvatarUpload from "../../Components/AvatarUpload";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Checkbox from "../../Components/Checkbox";

const Profile = ({ auth, profile, firebase }) => {
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [publicProfile, setPublicProfile] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDisplayName(profile.displayName || "");
    setAvatar(profile.avatar || "");
    setBio(profile.bio || "");
    setPublicProfile(profile.publicProfile);
    setNewsletter(profile.newsletter);
    setReminders(profile.reminders);
  }, [profile]);

  const uploadAvatar = async () => {
    const id = auth.uid;
    try {
      const ref = firebase
        .storage()
        .ref()
        .child(`${id}.${avatar.name.split(".").pop()}`);
      const snapshot = await ref.put(avatar);
      const url = await snapshot.ref.getDownloadURL();
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const save = async () => {
    setLoading(true);
    try {
      let url = avatar;
      if (typeof avatar !== "string") {
        url = await uploadAvatar();
      }
      await firebase.updateProfile({
        displayName,
        avatar: url,
        bio,
        publicProfile,
        newsletter,
        reminders
      });
      setLoading(false);
      toast.success("Profile updated!");
    } catch (e) {
      setLoading(false);
      toast.error("There was an error updating the profile!");
    }
  };

  return (
    <div className="section">
      <Container small paddingVertical="5rem" card>
        <div className="columns">
          <div className="column">
            <h2 className="title">Profile</h2>
            <div className="field">
              <div className="control">
                <AvatarUpload src={avatar} onChange={a => setAvatar(a)} />
              </div>
            </div>
            <Input
              onChange={({ target: { value } }) => setDisplayName(value)}
              value={displayName || ""}
              type="text"
              placeholder="John Doe"
              label="Name"
            />
            <Textarea
              label="Short bio"
              placeholder="Example bio"
              value={bio}
              onChange={({ target: { value } }) => setBio(value)}
              rows={4}
            />
          </div>
          <div className="column">
            <h2 className="subtitle has-text-weight-bold">Settings</h2>
            <Checkbox
              label="Make this profile public"
              help="You will have a public page that displays your achivements, no
              personal data in you don't want"
              checked={publicProfile}
              onChange={() => setPublicProfile(!publicProfile)}
            />

            <div className="field">
              <div className="control">
                <p>
                  <a
                    style={{ fontSize: ".8rem" }}
                    href={`https://app.carboin.org/u/${auth.uid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Public profile
                  </a>
                </p>
              </div>
            </div>

            <h2 className="subtitle has-text-weight-bold">Notifications</h2>

            <Checkbox
              label="Subscribe to weekly newsletter"
              help="We won't spam you, only cool news🌱"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />

            <Checkbox
              label="Receive reminders to become carbon neutral"
              checked={reminders}
              onChange={() => setReminders(!reminders)}
            />
          </div>
        </div>
        <button
          className={classNames("button", "is-primary", "is-fullwidth", {
            "is-loading": loading
          })}
          onClick={save}
        >
          Save
        </button>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ firebase: { auth, profile } }) => ({
  auth,
  profile
});

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(Profile);
