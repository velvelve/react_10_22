import { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleProfile } from '../store/profile/actions';
import { ProfileState } from '../store/profile/reducer';

export const About: FC = ({ visible, toggle }: any) => {
  return (
    <>
      <h2>About Page</h2>
      <p>Visible: {visible ? 'yes' : 'no'}</p>
      <input type="checkbox" checked={visible} readOnly />
      <button onClick={() => toggle()}>Change visibility</button>
    </>
  );
};

const mapStateToProps = (state: ProfileState) => ({
  visible: state.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(toggleProfile()),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
