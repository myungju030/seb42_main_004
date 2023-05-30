import TabBar from '../components/commons/TabBar';
import MyInfoUl from '../components/myInfo/MyInfoUl';

function EditPassword() {
  return (
    <TabBar pathName="MyInfo">
      <MyInfoUl pathName="password" />
    </TabBar>
  );
}

export default EditPassword;
