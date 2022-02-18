import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedPageAction } from "../../store/pages/actions";
import MainHeader from "./MainHeader";

const MainHeaderContainer = (props) => {
    return <MainHeader {...props} />
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedPage: bindActionCreators(setSelectedPageAction, dispatch)
});

export default connect(undefined, mapDispatchToProps)(MainHeaderContainer)