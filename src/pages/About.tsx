import { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../store';
import { toggleProfile } from '../store/profile/slice';

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

const mapStateToProps = (state: StoreState) => ({
  visible: state.profile.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(toggleProfile()),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
