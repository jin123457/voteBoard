import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVoteData } from "../redux/voteReducer";
import { Box, Alert, Collapse, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Layout from "../components/Loading";
import CloseIcon from "@mui/icons-material/Close";

function VoteResult() {
  const [alertOpen, setAlertOpen] = useState(false);
  const voteResultState = useSelector((state: any) => state.voteResultReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVoteData());
  }, [dispatch]);

  const voteFinishAlert = (status: number) =>
    status !== 1 && setAlertOpen(true);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "제목",
      width: 300,
      renderCell: (params) => (
        <Link
          to={
            params.row.status === 1
              ? `/selected/${params.row.id}`
              : `/result/${params.row.id}`
          }
          onClick={() => {
            voteFinishAlert(params.row.status);
          }}
        >
          {params.row.title}
        </Link>
      ),
    },
    { field: "creator", headerName: "작성자", width: 150 },
    {
      field: "created_at",
      headerName: "생성일",
      width: 300,
      editable: true,
    },
    {
      field: "status",
      headerName: "진행상황",
      width: 90,
      renderCell: (params) => (
        <p>{params.row.status === 1 ? "진행" : "마감"}</p>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={voteResultState.voteData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <Link to="/create">등록</Link>
      {alertOpen ? (
        <Collapse in={alertOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            마감된 투표입니다.
          </Alert>
        </Collapse>
      ) : undefined}
      {voteResultState.loading ? <Layout /> : null}
    </>
  );
}

export default VoteResult;
