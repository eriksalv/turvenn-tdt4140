const useNavigate = jest.fn();
const useLocation = jest.fn();
function Link() {
  return <div>Link</div>;
}
module.exports = { useNavigate, useLocation, Link };
