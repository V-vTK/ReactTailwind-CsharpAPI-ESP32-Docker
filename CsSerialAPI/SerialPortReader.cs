
using System;
using System.IO.Ports;
namespace CsSerialAPI
{ 
    public class SerialPortReader
    {
        private string portName;
        private int baudRate;
        private int readTimeout;
        private SerialPort serialPort;

        public SerialPortReader(string portName, int baudRate, int readTimeout)
        {
            this.portName = portName;
            this.baudRate = baudRate;
            this.readTimeout = readTimeout;

            serialPort = new SerialPort(portName, baudRate);
            //serialPort.ReadTimeout = readTimeout; // noTimeout
        }

        public string ReadData()
        {
            try
            {
                serialPort.Open();

                if (serialPort.IsOpen)
                {
                    string data = serialPort.ReadLine();
                    serialPort.Close();
                    return data;
                }
            }
            catch (UnauthorizedAccessException ex)
            {
                Console.WriteLine("Unauthorized access exception: " + ex.Message);
            }
            catch (IOException ex)
            {
                Console.WriteLine("IO exception: " + ex.Message);
            }
            finally
            {
                if (serialPort.IsOpen)
                    serialPort.Close();
            }

            return null;
        }

        public List<string> ReadMultipleLines(int linesToRead)
        {
            List<string> dataLines = new List<string>();

            try
            {
                serialPort.Open();

                if (serialPort.IsOpen)
                {
                    for (int i = 0; i < linesToRead; i++)
                    {
                        string data = serialPort.ReadLine();
                        if (data.Contains("humidity") && data.Contains("temperature"))
                        {
                            dataLines.Add(data);
                        }
                    }

                    serialPort.Close();
                    return dataLines;
                }
            }
            catch (UnauthorizedAccessException ex)
            {
                Console.WriteLine("Unauthorized access exception: " + ex.Message);
            }
            catch (IOException ex)
            {
                Console.WriteLine("IO exception: " + ex.Message);
            }
            finally
            {
                if (serialPort.IsOpen)
                    serialPort.Close();
            }

            return null;
        }
    }
}