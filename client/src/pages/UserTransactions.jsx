import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Book as BookIcon, Person as PersonIcon } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundImage from "../assets/usertransc.jpg";

const UserTransactions = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const response = await api.get(`/transactions/${id}`);
        setTransactions(response.data.transactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user transactions:", error);
        setLoading(false);
      }
    };
    fetchUserTransactions();
  }, [id]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          pt: 8,
          pb: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonIcon /> User Transactions
              </Typography>

              {/* Loading Spinner */}
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <NumbersIcon sx={{ mr: 1 }} />
                            <strong>ID</strong>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <BookIcon sx={{ mr: 1 }} />
                            <strong>Book Title</strong>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CheckCircleIcon sx={{ mr: 1 }} />
                            <strong>Action</strong>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CalendarMonthIcon sx={{ mr: 1 }} />
                            <strong>Borrow Date</strong>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CalendarMonthIcon sx={{ mr: 1 }} />
                            <strong>Return Date</strong>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CurrencyRupeeIcon sx={{ mr: 1 }} />
                            <strong>Fine</strong>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>{transaction.Book.title}</TableCell>
                          <TableCell>{transaction.action}</TableCell>
                          <TableCell>
                            {new Date(
                              transaction.borrowDate
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {transaction.returnDate
                              ? new Date(
                                  transaction.returnDate
                                ).toLocaleDateString()
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            {/* Ensure fine is a valid number before calling toFixed */}
                            {typeof transaction.fine === "number" &&
                            !isNaN(transaction.fine)
                              ? transaction.fine.toFixed(2)
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default UserTransactions;
